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
    [Route("api/Patients")]
    [ApiController]
    public class Patients : ControllerBase
    {
        private readonly DataContext _context;

        public Patients(DataContext context)
        {
            _context = context;
        }

        // GET: api/Patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetActivePacients()
        {
            var users = await _context.Users.ToListAsync();
            var userList = new List<UserDTO>();

            users.ForEach(user =>
            {
                var userDTO = getUserInfo(user);
                if (userDTO.accountType == "patient" && userDTO.IsActive)
                    userList.Add(userDTO);
            });

            return userList;
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
