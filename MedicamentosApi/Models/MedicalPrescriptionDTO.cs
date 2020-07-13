using System;

public class MedicalPrescriptionDTO
{
    public long Id { get; set; }
    public User Doctor { get; set; }
    public User Patient { get; set; }
    public Drug Drug { get; set; }
    public Int16 Quantity { get; set; }
    public decimal TotalPrice { get; set; }

}