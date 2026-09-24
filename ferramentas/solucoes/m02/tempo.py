total_segundos = 7384

# calcula horas, minutos e segundos
horas = total_segundos // 3600
minutos = total_segundos % 3600 // 60
segundos = total_segundos % 60

# mostra o resultado
print(horas, "horas,", minutos, "minutos e", segundos, "segundos")
