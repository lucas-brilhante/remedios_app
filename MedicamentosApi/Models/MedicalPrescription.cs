using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
public class MedicalPrescription
{
    [Key]
    public long Id { get; set; }

    [Required]
    [CheckUser(ErrorMessage = "Médico inválido.")]
    public long DoctorId { get; set; }

    [Required]
    [CheckUser(ErrorMessage = "Paciente inválido.")]
    public long PatientId { get; set; }

    [Required]
    [CheckDrug(ErrorMessage = "Medicamento inválido.")]
    public long DrugId { get; set; }

    [Required]
    [Range(1, Int16.MaxValue, ErrorMessage = "Quantidade inválida.")]
    public Int16 Quantity { get; set; }

    [DataType(DataType.Currency)]
    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalPrice { get; set; }

}