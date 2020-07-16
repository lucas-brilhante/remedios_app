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
    [Route("api/MedicalPrescriptions")]
    [ApiController]
    public class MedicalPrescriptions : ControllerBase
    {
        private readonly DataContext _context;

        public MedicalPrescriptions(DataContext context)
        {
            _context = context;
        }

        // GET: api/MedicalPrescriptions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalPrescriptionDTO>>> GetMedicalPrescription()
        {
            var medicalPrescription = await _context.MedicalPrescriptions.ToListAsync();
            var medicalPrescriptionList = new List<MedicalPrescriptionDTO>();

            medicalPrescription.ForEach(mPrescription =>
            {
                var medicalPrescriptionDTO = GetMedicalPrescriptionInfo(mPrescription);
                medicalPrescriptionList.Add(medicalPrescriptionDTO);
            });

            return medicalPrescriptionList;
        }

        // GET: api/MedicalPrescriptions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalPrescriptionDTO>> GetMedicalPrescription(long id)
        {
            var medicalPrescription = await _context.MedicalPrescriptions.FindAsync(id);

            if (medicalPrescription == null)
                return NotFound();

            var medicalPrescriptionDTO = GetMedicalPrescriptionInfo(medicalPrescription);
            return medicalPrescriptionDTO;
        }

        // PUT: api/MedicalPrescriptions/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalPrescription(long id, MedicalPrescription medicalPrescription)
        {
            if (id != medicalPrescription.Id)
            {
                return BadRequest();
            }

            var drug = await _context.Drugs.SingleOrDefaultAsync(drug => drug.Id == medicalPrescription.DrugId);

            medicalPrescription.TotalPrice = medicalPrescription.Quantity * drug.Price;

            _context.Entry(medicalPrescription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalPrescriptionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MedicalPrescriptions
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MedicalPrescription>> PostMedicalPrescription(MedicalPrescription medicalPrescription)
        {
            var drug = await _context.Drugs.SingleOrDefaultAsync(drug => drug.Id == medicalPrescription.DrugId);

            medicalPrescription.TotalPrice = medicalPrescription.Quantity * drug.Price;

            _context.MedicalPrescriptions.Add(medicalPrescription);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMedicalPrescription), new { id = medicalPrescription.Id }, GetMedicalPrescriptionInfo(medicalPrescription));
        }

        // DELETE: api/MedicalPrescriptions/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MedicalPrescription>> DeleteMedicalPrescription(long id)
        {
            var medicalPrescription = await _context.MedicalPrescriptions.FindAsync(id);
            if (medicalPrescription == null)
            {
                return NotFound();
            }

            _context.MedicalPrescriptions.Remove(medicalPrescription);
            await _context.SaveChangesAsync();

            return medicalPrescription;
        }

        private bool MedicalPrescriptionExists(long id)
        {
            return _context.MedicalPrescriptions.Any(e => e.Id == id);
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
