using System.ComponentModel.DataAnnotations;
using System.Linq;
using MedicamentosApi.Data;
using System;

public class CheckDrug : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        long drugId = Convert.ToInt64(value);
        var _context = (DataContext)validationContext.GetService(typeof(DataContext));
        var exist = _context.Drugs.Any(drug => drug.Id == drugId);

        if (!exist)
            return new ValidationResult("Medicamento inválido.");

        return ValidationResult.Success;

    }
}