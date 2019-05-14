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
            f = io.open(filename, 'r', encoding='utf8')
            reader = f.read().splitlines()
            self.length = len(reader) * 2
            self._initList()

            for word in reader:
                hash = self.fn(word)
                self.hashtable[hash].append(word)

    def exportHashTable(self, folder):
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
    dictPaths = [("test", "dict/test.txt")]  
    exportFolderPath = "hash"      

    deleteFolder(exportFolderPath)

    for i in range(len(dictPaths)):
        h = HashTable(dictPaths[i][0])
        h.generateHashTable(dictPaths[i][1])
        h.exportHashTable(exportFolderPath)
        print("export finished for " + dictPaths[i][0])

