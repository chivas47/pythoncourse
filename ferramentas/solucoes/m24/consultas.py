def sql_total_por_loja():
    return """
        SELECT loja, SUM(valor) AS total
        FROM vendas
        GROUP BY loja
        HAVING SUM(valor) > 100
        ORDER BY total DESC
    """
