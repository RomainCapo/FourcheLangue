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
        c = 11
        for x in string:
            hash += (ord(x) * (c**i))
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
        if os.path.exists(filename):
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

        else:
            print("File not found")
            sys.exit(-1)

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
    hashtable.py <export_folder> <dict_name_and_path>

    <export_folder> : path of the export folder
    <dict_name_and_path> : <lang>;<path>

    For default parameter, do not specify any arguments
    """ 

    #default parameters
    exportFolderPath = "hash"
    dictPaths = [("french", "dict/french.txt"), ("english", "dict/english.txt"), ("deutsch", "dict/deutsch.txt"), ("italiano", "dict/italiano.txt"), ("espanol", "dict/espanol.txt"), ("norsk", "dict/norsk.txt"), ("dansk", "dict/dansk.txt")]

    if len(sys.argv) > 1:
        exportFolderPath = sys.argv[1]

    if len(sys.argv) > 2:
        dictPaths.clear()

        for i in range(len(sys.argv)):
            if i != 0 and i!= 1:
                res = sys.argv[i].split(";")
                if len(res) != 2:
                    print(usage)
                    sys.exit(-1)

                dict_entry = (res[0], res[1])
                dictPaths.append(dict_entry)

    deleteFolder(exportFolderPath)

    for i in range(len(dictPaths)):
        h = HashTable(dictPaths[i][0])
        h.generateHashTable(dictPaths[i][1])
        h.exportHashTable(exportFolderPath)
        print("export finished for " + dictPaths[i][0])

