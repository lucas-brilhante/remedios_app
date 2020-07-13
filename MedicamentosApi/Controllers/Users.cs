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
    [Route("api/Users")]
    [ApiController]
    public class Users : ControllerBase
    {
        private readonly DataContext _context;

        public Users(DataContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            var userList = new List<UserDTO>();

            users.ForEach(user =>
            {
                var userDTO = getUserInfo(user);
                userList.Add(userDTO);
            });

            return userList;
        }

        // GET: api/Users/5
        [HttpGet("{login}")]
        public async Task<ActionResult<UserDTO>> GetUser(string login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(user => user.Login == login);

            if (user == null)
                return NotFound();

            var userDTO = getUserInfo(user);

            return userDTO;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(long id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserDTO>> PostUser(UserDTO userDTO)
        {

            User user = new User();

            user.Login = userDTO.Login;
            user.Name = userDTO.Name;
            user.LastName = userDTO.LastName;
            user.BirthDate = userDTO.BirthDate;
            user.Cpf = userDTO.Cpf;
            user.IsActive = userDTO.IsActive;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            if (userDTO.Token != null)
            {
                Admin admin = new Admin();
                admin.Token = userDTO.Token;
                admin.RegistrationNumber = userDTO.RegistrationNumber;
                admin.UserId = user.Id;
                _context.Admins.Add(admin);
            }
            else if (userDTO.CrmNumber != null)
            {
                Doctor doctor = new Doctor();
                doctor.CrmNumber = userDTO.CrmNumber;
                doctor.UserId = user.Id;
                _context.Doctors.Add(doctor);
            }

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUser), new { login = user.Login }, userDTO);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(long id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(long id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private bool isValid(UserDTO userDTO)
        {
            var checkCpf = _context.Users.Any(user => user.Cpf == userDTO.Cpf);
            if (checkCpf)
                return true;

            return false;
        }
        private UserDTO getUserInfo(User user)
        {
            var adminInfo = _context.Admins.SingleOrDefault(admin => admin.UserId == user.Id);
            var doctorInfo = _context.Doctors.SingleOrDefault(doctor => doctor.UserId == user.Id);

            UserDTO userDTO = new UserDTO();

            userDTO.Id = user.Id;
            userDTO.Login = user.Login;
            userDTO.Name = user.Name;
            userDTO.LastName = user.LastName;
            userDTO.BirthDate = user.BirthDate;
            userDTO.Cpf = user.Cpf;
            userDTO.IsActive = user.IsActive;
            if (adminInfo != null)
            {
                userDTO.RegistrationNumber = adminInfo.RegistrationNumber;
                userDTO.Token = adminInfo.Token;
                userDTO.accountType = "admin";
            }
            else if (doctorInfo != null)
            {
                userDTO.CrmNumber = doctorInfo.CrmNumber;
                userDTO.accountType = "doctor";
            }
            else
                userDTO.accountType = "patient";

            return userDTO;
        }
    }
}
