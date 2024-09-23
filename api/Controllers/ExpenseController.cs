using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ExpenseController(AppDbContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<ExpenseModel>> getExpenses(){
            var students = await _context.Expenses.AsNoTracking().ToListAsync();
            return students;
        }

        [HttpPost]
        public async Task<IActionResult> Create(ExpenseModel expense){
            if(!ModelState.IsValid){
                return BadRequest(ModelState);
            }
            await _context.AddAsync(expense);

            var result = await _context.SaveChangesAsync();

            if (result > 0) {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id){
            var student = await _context.Expenses.FindAsync(id);
            if (student == null){
                return NotFound();
            }
            _context.Remove(student);
            var result = await _context.SaveChangesAsync();
            if (result > 0) {
                return Ok("Expense was deleted successfully");
            }
            return BadRequest();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ExpenseModel>> GetExpenses(int id){
            var student = await _context.Expenses.FindAsync(id);
            if (student == null){
                return NotFound();
            }
            return Ok(student);
        }  

        [HttpPut("{id:int}")]
        public async Task<IActionResult> EditExpense(int id, ExpenseModel expense){
            
            var thisExpense = await _context.Expenses.FindAsync(id);

            if (thisExpense == null){
                return NotFound();
            }
            thisExpense.Description = expense.Description;
            thisExpense.Amount = expense.Amount;
            thisExpense.Category = expense.Category;
            
            var result = await _context.SaveChangesAsync();
            if (result > 0) {
                return Ok("Expense was updated successfully");
            }
            return BadRequest();
        }              
    }
}