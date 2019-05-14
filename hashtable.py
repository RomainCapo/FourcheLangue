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

    def fn(self, string):
        """
        Fonction de hachage

        string -- mot à hacher
        return -- le hash du mot
        """
        hash = 0
        i = 0
        c = 42
        for x in string:
            hash = hash + (ord(x) * (c**i))
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

            for word in reader:
                hash = self.fn(word)
                self.hashtable[hash].append(word)

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
    dictPaths = [("french", "dict/french.txt"), ("english", "dict/english.txt"), ("deutsch", "dict/deutsch.txt"), ("italiano", "dict/italiano.txt"), ("espanol", "dict/espanol.txt"), ("norsk", "dict/norsk.txt"), ("dansk", "dict/dansk.txt")]
    exportFolderPath = "hash"

    deleteFolder(exportFolderPath)

    for i in range(len(dictPaths)):
        h = HashTable(dictPaths[i][0])
        h.generateHashTable(dictPaths[i][1])
        h.exportHashTable(exportFolderPath)
        print("export finished for " + dictPaths[i][0])
