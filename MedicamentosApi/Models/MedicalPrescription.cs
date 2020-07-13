using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
public class MedicalPrescription
{
    [Key]
    public long Id { get; set; }

    [Required]
    public long DoctorId { get; set; }

    [Required]
    public long PatientId { get; set; }

    [Required]
    public long DrugId { get; set; }

    [Required]
    public Int16 Quantity { get; set; }

    [DataType(DataType.Currency)]
    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalPrice { get; set; }

}