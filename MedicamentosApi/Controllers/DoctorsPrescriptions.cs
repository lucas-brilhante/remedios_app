using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicamentosApi.Data;

namespace MedicamentosApi.Controllers
{
    [Route("api/DoctorsPrescriptions")]
    [ApiController]
    public class DoctorsPrescriptions : ControllerBase
    {
        private readonly DataContext _context;

        public DoctorsPrescriptions(DataContext context)
        {
            _context = context;
        }

        // GET: api/DoctorsPrescriptions
        [HttpGet("{doctorId}")]
        public async Task<ActionResult<IEnumerable<MedicalPrescriptionDTO>>> GetDoctorsPrescriptions(long doctorId)
        {
            var medicalPrescription = await _context.MedicalPrescriptions.ToListAsync();
            var medicalPrescriptionList = new List<MedicalPrescriptionDTO>();

            medicalPrescription.ForEach(mPrescription =>
            {
                if (mPrescription.DoctorId == doctorId)
                {
                    var medicalPrescriptionDTO = GetMedicalPrescriptionInfo(mPrescription);
                    medicalPrescriptionList.Add(medicalPrescriptionDTO);
                }
            });

            return medicalPrescriptionList;
        }

        private MedicalPrescriptionDTO GetMedicalPrescriptionInfo(MedicalPrescription medicalPrescription)
        {
            var doctor = _context.Users.SingleOrDefault(doctor => doctor.Id == medicalPrescription.DoctorId);
            var patient = _context.Users.SingleOrDefault(patient => patient.Id == medicalPrescription.PatientId);
            var drug = _context.Drugs.SingleOrDefault(drug => drug.Id == medicalPrescription.DrugId);

            MedicalPrescriptionDTO medicalPrescriptionDTO = new MedicalPrescriptionDTO();
            medicalPrescriptionDTO.Id = medicalPrescription.Id;
            medicalPrescriptionDTO.Doctor = doctor;
            medicalPrescriptionDTO.Patient = patient;
            medicalPrescriptionDTO.Drug = drug;
            medicalPrescriptionDTO.Quantity = medicalPrescription.Quantity;
            medicalPrescriptionDTO.TotalPrice = medicalPrescription.TotalPrice;

            return medicalPrescriptionDTO;
        }
    }
}