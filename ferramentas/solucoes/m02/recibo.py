preco = 12.5
iva = 0.23

# cria total e recibo, e mostra o recibo
total = preco * (1 + iva)
recibo = f"Total: {total:.2f} euros"
print(recibo)
