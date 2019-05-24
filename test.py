"""
Fourche Langue
Cours d'algorithme
Romain Capocasale
Vincent Moulin
INF2dlm-a
2018-2019
"""
def fn(string):
    """
    Fonction de hachage

    string -- mot à hacher
    return -- le hash du mot
    """
    hash = 0
    i = 0
    c = 11
    for x in string:
        value = (ord(x) * (c**i))
        hash += value
        print(value)
        i = i + 1
    return hash % 417832

if __name__ == "__main__":
    print(fn("anticonstitutionnellement"))
