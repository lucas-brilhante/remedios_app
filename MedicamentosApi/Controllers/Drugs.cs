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
    [Route("api/drugs")]
    [ApiController]
    public class Drugs : ControllerBase
    {
        private readonly DataContext _context;

        public Drugs(DataContext context)
        {
            _context = context;
        }

        // GET: api/Drugs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DrugDTO>>> GetDrugs()
        {
            var drugs = await _context.Drugs.ToListAsync();
            var drugList = new List<DrugDTO>();

            drugs.ForEach(drug =>
            {
                var drugDTO = getDrugInfo(drug);
                drugList.Add(drugDTO);
            });

            return drugList;
        }

        // GET: api/Drugs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DrugDTO>> GetDrug(long id)
        {
            //var drug = await _context.Drugs.FindAsync(id);
            var drug = await _context.Drugs.SingleOrDefaultAsync(drug => drug.Id == id);

            if (drug == null)
                return NotFound();

            var drugDTO = getDrugInfo(drug);

            return drugDTO;
        }

        // PUT: api/Drugs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDrug(long id, DrugPut drugPut)
        {
            if (id != drugPut.Id)
            {
                return BadRequest();
            }

            Drug drug = new Drug();

            drug.Id = drugPut.Id;
            drug.Name = drugPut.Name;
            drug.Price = drugPut.Price;
            drug.ExpirationDate = drugPut.ExpirationDate;
            drug.CategoryId = drugPut.CategoryId;

            _context.Entry(drug).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DrugExists(id))
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

        // POST: api/Drugs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DrugDTO>> PostDrug(Drug drug)
        {
            _context.Drugs.Add(drug);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDrug), new { id = drug.Id }, getDrugInfo(drug));
        }

        // DELETE: api/Drugs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DrugDTO>> DeleteDrug(long id)
        {
            var drug = await _context.Drugs.FindAsync(id);
            if (drug == null)
            {
                return NotFound();
            }

            _context.Drugs.Remove(drug);
            await _context.SaveChangesAsync();

            return getDrugInfo(drug);
        }

        private bool DrugExists(long id)
        {
            return _context.Drugs.Any(e => e.Id == id);
        }

        private DrugDTO getDrugInfo(Drug drug)
        {
            var category = _context.Categories.SingleOrDefault(category => category.Id == drug.CategoryId);
            var drugDTO = new DrugDTO();

            drugDTO.Id = drug.Id;
            drugDTO.Name = drug.Name;
            drugDTO.Price = drug.Price;
            drugDTO.ExpirationDate = drug.ExpirationDate;
            drugDTO.Category = category;

            return drugDTO;
        }
    }
}
