import time
import math
import random

def get_true_random_number():
    now = time.time() * 1000  # tempo atual em milissegundos
    random_offset = math.sin(now) * 10000  # Perturbação caótica baseada no tempo
    random_value = (random.random() + random_offset) % 1
    random_value += (random.random() * 10) % 1  # Adiciona mais variabilidade com outra chamada
    random_value += (now % 1000) / 1000  # Adiciona milissegundos atuais
    return random_value % 1  # Normaliza para o intervalo [0, 1)

def simulate(quantity, house_value, value):
    result = {
        "sum": 0,
        "houseWins": 0,
        "playerWins": 0
    }
    threshold = normalize_integer(float(house_value),0,1)
    for _ in range(int(quantity)):
        random_result = get_true_random_number()
        
        if random_result <= threshold:
            result["sum"] += float(value)
            result["houseWins"] += 1
        else:
            result["sum"] -= float(value)
            result["playerWins"] += 1
    
    return result


def normalize_integer(x, min_value, max_value):
    if min_value >= max_value:
        raise ValueError("min_value must be less than max_value.")

    normalized = (x - min_value) / (max_value - min_value)
 
    return max(0, min(1, normalized))