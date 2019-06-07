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

    def generateHashTable(self, filename):
        """
        Genère la table de haschage a partir d'un fichier txt

        filename -- chemin du fichier
        """
        f =  io.open(filename, 'r', encoding='latin-1')
        reader = f.read().splitlines()
        self.length = len(reader) * 2
        self._initList()

        self.hasList = [0 for x in range(self.length)]

        for word in reader:
            hash = self.fn(word)
            self.hashtable[hash].append(word)

            #Calcule des collisions
            if len(self.hashtable[hash]) > 1:
                self.nbCollision +=1

            #Calcule du taux de remplissage
            self.hasList[hash] = 1            
        
        nbList = self.hasList.count(1)
        self.fillingRate = float("%.2f" % ((nbList / self.length) * 100))


    def exportHashTable(self, folder):
        """
        Exporte la table de hachage dans un fichier json. Le nom du fichier est le nom passé au constructeur.

        folder -- nom du dossier de destination du fichier json
        """
        out = {}
        out["hashtable"] = []

        for listWord in self.hashtable:
            out["hashtable"].append(listWord)

        out['length'] = self.length
        out['nbCollision'] = self.nbCollision
        out['fillingRate'] = self.fillingRate

        if not os.path.exists(folder):
            os.makedirs(folder)

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
        else :
            print(usage)
            sys.exit(-1)

