using System;
using System.ComponentModel.DataAnnotations.Schema;

public class DrugDTO
{
    public long Id { get; set; }
    public string Name { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }
    public DateTime ExpirationDate { get; set; }
    public Category Category { get; set; }
}