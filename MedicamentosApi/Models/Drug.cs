using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Drug
{
    [Key]
    public long Id { get; set; }

    [Required]
    [MinLength(5, ErrorMessage = "O nome deve ter no mínimo 5 caracteres.")]
    [MaxLength(30, ErrorMessage = "O nome deve ter no máximo 30 caracteres.")]
    public string Name { get; set; }

    [Required]
    [DataType(DataType.Currency)]
    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    [Required]
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
    [ExpirationDate(ErrorMessage = "Data inválida.")]
    public DateTime ExpirationDate { get; set; }

    [Required]
    public long CategoryId { get; set; }
    public Category Category { get; set; }
}