using System.ComponentModel.DataAnnotations;
public class Drug
{
    public long Id { get; set; }
    public string Name { get; set; }

    [Range(1, 100)]
    [DataType(DataType.Currency)]
    public decimal Price { get; set; }
    public string Secret { get; set; }
}