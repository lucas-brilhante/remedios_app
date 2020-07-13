using System.ComponentModel.DataAnnotations;
public class Category
{
    [Key]
    public long Id { get; set; }

    [Required]
    public string Title { get; set; }
}