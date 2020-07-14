using System.ComponentModel.DataAnnotations;
using System;

public class ExpirationDateAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        DateTime d = Convert.ToDateTime(value);
        return d >= DateTime.Now;

    }
}