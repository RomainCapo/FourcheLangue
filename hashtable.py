"""
Fourche Langue
Cours d'algorithme
Romain Capocasale
Vincent Moulin
INF2dlm-a
2018-2019
"""
import os.path
import json

class HashTable:
    def __init__(self):
        self.words = []
        self.hashtable = []

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

    def _openFile(self, filename, mode):
        if os.path.exists(filename):
            return open(filename, mode)

    def _initList(self):
        self.hashtable = [[] for x in range(self.length)]

    def generateHashTable(self, filename):
            f = self._openFile(filename, 'r')
            reader = f.read().splitlines()
            self.length = len(reader) * 2
            self._initList()
            print(self.length)

            for word in reader:
                hash = self.fn(word)
                print("word : " + word + ", hash : " + str(hash))
                
                self.hashtable[hash].append(word)

    def exportHashTable(self, filename):
        f = self._openFile(filename, 'w')
        out = {}       
        
        print(out)
            

        

#french_path = "C:/Users/Romain/Desktop/He-Arc/Algorithme/projetalgo/dict/french.txt"
french_path = "dict/french.txt"

t = HashTable()
t.generateHashTable(french_path)

print(t.hashtable)

t.exportHashTable('fes.txt')