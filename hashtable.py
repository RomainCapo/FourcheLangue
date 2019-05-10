"""
Fourche Langue
Cours d'algorithme
Romain Capocasale
Vincent Moulin
INF2dlm-a
2018-2019
"""
import os.path

class HashTable:
    def __init__(self):
        self.words = []
        self.length = 20000

    def djb2(self, string):
        hash = 0 
        for x in string:
            hash = ((hash << 5) + hash) + ord(x)
        return hash

    def fn(self, string):
        hash = 0
        i = 1
        for x in string:
            hash = hash + (ord(x) *i)
            i = i + 1
        return hash % self.length 

    def _openFile(self, filename):
        if os.path.exists(filename):
            f = open(filename, 'r')
            print(f.readlines())

    def generateHashTable(self, filename):
            pass
            #for word in f.readlines():
             #   print(word)
        

french_path = "C:/DEV/2eme/algo/projetalgo/dict/french.txt"
#french_path = "dict/french.txt"

t = HashTable()
t._openFile(french_path)