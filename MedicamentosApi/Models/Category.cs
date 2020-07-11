using System.ComponentModel.DataAnnotations;
public class Categorie
{
    public long Id { get; set; }
    public string Name { get; set; }
    public bool IsComplete { get; set; }
    public string Secret { get; set; }
}