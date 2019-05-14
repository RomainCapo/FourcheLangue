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

class HashTable:
    def __init__(self, lang):
        self.hashtable = []
        self.lang = lang

    def djb2(self, string):
        hash = 0 
        for x in string:
            hash = ((hash << 5) + hash) + ord(x)
        return hash % self.length

    def fn(self, string):
        hash = 0
        i = 0
        c = 42
        for x in string:
            hash = hash + (ord(x) * (c**i))
            i = i + 1
        return hash % self.length 

    def _initList(self):
        self.hashtable = [[] for x in range(self.length)]

    def generateHashTable(self, filename):

        if os.path.exists(filename):
            f = open(filename, 'r')
            reader = f.read().splitlines()
            self.length = len(reader) * 2
            self._initList()

            for word in reader:
                hash = self.fn(word)
                self.hashtable[hash].append(word)

    def exportHashTable(self, folder):
        """out = {}
        out["hashtable"] = {}
        for  hash, listWord in enumerate(self.hashtable):
            out["hashtable"][hash] = []
            for iList in range(len(listWord)):
                out["hashtable"][hash].append(listWord[iList])"""

        out = {}
        out["hashtable"] = []
        for hash, listWord in enumerate(self.hashtable):
            for iList in range(len(listWord)):
                out["hashtable"].append(listWord[iList])

        out['length'] = self.length

        if not os.path.exists(folder):
            os.makedirs(folder)

        with open(folder + "/" + self.lang + ".json", 'w') as outfile:
            json.dump(out, outfile)

def deleteFolder(folder):
    if os.path.exists(folder):
        shutil.rmtree(folder)

def fn(string):
    hash = 0
    i = 0
    c = 42
    for x in string:
        hash = hash + (ord(x) * (c**i))
        i = i + 1
    return hash % 20

if __name__ == "__main__":
    dictPaths = [("french", "dict/french.txt"), ("english", "dict/english.txt")]  
    exportFolderPath = "hash"      

    deleteFolder(exportFolderPath)

    for i in range(len(dictPaths)):
        h = HashTable(dictPaths[i][0])
        h.generateHashTable(dictPaths[i][1])
        h.exportHashTable(exportFolderPath)

    
