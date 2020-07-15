using System.ComponentModel.DataAnnotations;
public class Category
{
    [Key]
    public long Id { get; set; }

    [Required(ErrorMessage = "Nome inválido.")]
    [CheckTitle(ErrorMessage = "Categoria já cadastrada.")]
    public string Title { get; set; }
}