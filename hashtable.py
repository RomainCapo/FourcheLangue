"""
Fourche Langue
Cours d'algorithme
Romain Capocasale
Vincent Moulin
INF2dlm-a
2018-2019
"""
import os.path
import shutil
import json
import io
import sys
import random
import time

class HashTable:
    """
    Classe représentant la hashtable

    Attributes
    ----------
    hashtable : liste contenant des listes de mot, reprsente la table de hachage
    lang : langue de la table de hachage
    length : longeur de la table de hachage, qui corresponds a 2 fois la taille de la liste de mot
    """

    def __init__(self, lang):
        """
        Constructeur de la classe hashtable

        lang -- langue de la hashtable
        """
        self.hashtable = []
        self.lang = lang
        self.nbCollision = 0
        self.hasList = []
        self.fillingRate = 0

    def fn(self, string):
        """
        Fonction de hachage

        string -- mot à hacher
        return -- le hash du mot
        """
        hash = 0
        i = 0
        c = 5
        for x in string:
            hash += ord(x) ** c * (i+1)
            i = i + 1
        return hash % self.length

    def _initList(self):
        """
        Initialise la table de hachage avec des listes vides
        """
        self.hashtable = [[] for x in range(self.length)]

    def _getWordsFromFile(self):
        """
        Permet de récupérer tous les mots du fichier texte de la table de hachage

        return -- liste de tous les mots du fichier
        """

        f =  io.open(self.filename, 'r', encoding='utf8')
        reader = f.read().splitlines()
        return reader

    def generateHashTable(self, filename):
        """
        Genère la table de haschage a partir d'un fichier txt

        filename -- chemin du fichier
        """
        self.filename = filename
        reader = self._getWordsFromFile()# On récupère tous les mots du fichier
        self.length = len(reader) * 2# On calcule la taille de la table de hachage pour une table ouverte cela corresponds à 2 fois le nombre d'élément à inserer dans la table
        self._initList()

        self.hasList = [0 for x in range(self.length)]

        for word in reader:
            if word != "":
                hash = self.fn(word)
                self.hashtable[hash].append(word)

                # Si il y a deja un élément dans la liste c'est qu'il y a une collision
                if len(self.hashtable[hash]) > 1:
                    self.nbCollision +=1

                # On indique les listes non vide par un 1
                # Permettera de calculer le taux de remplissage
                self.hasList[hash] = 1            
        
        nbList = self.hasList.count(1)# On compte le nombre de liste avec un 1
        self.fillingRate = float("%.2f" % ((nbList / self.length) * 100))# Calcule du taux de remplissage de la table a partir des listes pleine et non pleine

    def _getAverageAccessTime(self, n):
        """
        Calcule le temps d'accès moyen aux éléments de la table de hachage

        n -- nombre de mot utilisé pour le calcule de la moyenne
        return -- temps moyen d'accès à un élément de la table de hachage en nanoseconde
        """

        n = n % (self.length - 1) # Cette opération est nécessaire au cas ou le nombre de mot a calculer est plus grand que la longeur de la table de hachage
        reader = self._getWordsFromFile()
        sample = random.choices(reader, k=n)# Parmis les mots de la table on en choisi n

        totalTime = 0
        for sampleWord in sample:
            startTime = time.time_ns()

            hash = self.fn(sampleWord)
            listWord = self.hashtable[hash]
            
            # On cherche le mot dans la liste de mot correspondant à un hash
            # Des que le mot est trouvé on quitte la boucle
            for word in listWord:
                if word == sampleWord:
                    break
            totalTime += time.time_ns() - startTime #On ajoute le temps de la recherche au temps total
        
        return totalTime / n


    def exportHashTable(self, folder):
        """
        Exporte la table de hachage dans un fichier json. Le nom du fichier est le nom passé au constructeur.

        folder -- nom du dossier de destination du fichier json
        """
        out = {} #Création du json
        out["hashtable"] = []

        #Ajout des mots dans le fichier json
        for listWord in self.hashtable:
            out["hashtable"].append(listWord)

        out['length'] = self.length
        out['nbCollision'] = self.nbCollision
        out['fillingRate'] = self.fillingRate

        # Si le dossier existe pas on le cree
        if not os.path.exists(folder):
            os.makedirs(folder)

        # Ecriture du fichier json
        with io.open(folder + "/" + self.lang + ".json", 'w', encoding='utf8') as outfile:
            json.dump(out, outfile, ensure_ascii=False)

def deleteFolder(folder):
    """
    Supprime le dossier passé en parametre

    folder -- chemin du dossier a supprimer
    """
    if os.path.exists(folder):
        shutil.rmtree(folder)


if __name__ == "__main__":
    usage = """
    hashtable.py <source_folder> <export_folder>

    <source_folder> : path of the source folder, the soucre_folder must contain dictionaries files at .txt format
    <export_folder> : path of the export folder

    For default parameter, do not specify any arguments. Default parameter is source_folder=dict, export_folder=hash
    So you can specify 0, 1 or 2 parameters
    """ 

    #Parametres par défaut du script
    sourcePath = "dict"
    exportFolderPath = "hash"

    paramLength = len(sys.argv)#Nombre de paramétre
    del sys.argv[0]#On supprime le nom du script car on en a pas besoin

    #Si le script a plus de 3 paramètres, on quitte le script
    if paramLength > 3:
        print(usage)
        sys.exit(-1)

    #Si le script a plus de 2 paramètres l'utilisateur ne veut modifier que le dossier source
    if paramLength > 1:
        #On récupère le nom du dossier source, on supprimer le parametre de la liste des paramètres et on teste l'exsitance du dossier
        sourcePath = sys.argv[0]
        del sys.argv[0]
        if not os.path.exists(sourcePath):
            print(usage)
            print("Folder is not found !")
            sys.exit(-1)

    #Si il y a 3 paramètre l'utilisateur souhaite modifier egalement le dossier de destination
    if paramLength == 3:
        exportFolderPath = sys.argv[0]
        del sys.argv[0]

    deleteFolder(exportFolderPath)

    #Fichier Json d'autoload
    autoload = {}
    autoload["lang"] = []

    languages = os.listdir(sourcePath)#On récupère la liste des fichiers du dossier
    for i in range(len(languages)):
        langName = os.path.splitext(languages[i])[0]#On recupére le nom du fichier sans l'extension
        extension = os.path.splitext(languages[i])[1]#On récupére l'extension du fichier
        dictPath = sourcePath + "/" + languages[i]#Contient le chemin du dictionnaire au format txt

        #On test si c'est bien un fichier au format 
        if os.path.isfile(dictPath) and extension == ".txt":
            h = HashTable(langName)#On créé la table de hachage
            h.generateHashTable(dictPath)
            h.exportHashTable(exportFolderPath)
            print("export finished for " + langName)

            autoload["lang"].append([langName, exportFolderPath + "/" + langName + ".json"])#Ajout de la langue et du chemin au fichier json 
        else :
            print(usage)
            sys.exit(-1)

    #Creation du fichier json d'autoload
    with io.open("autoload.json", 'w', encoding='utf8') as outfile:
            json.dump(autoload, outfile, ensure_ascii=False)