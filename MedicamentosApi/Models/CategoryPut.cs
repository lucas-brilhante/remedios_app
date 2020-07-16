using System.ComponentModel.DataAnnotations;
public class CategoryPut
{
    [Key]
    public long Id { get; set; }

    [Required(ErrorMessage = "Nome inválido.")]
    public string Title { get; set; }
}