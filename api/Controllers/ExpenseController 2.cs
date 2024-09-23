using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

    [ApiController]
    [Route("api/[controller]")]

    public class ExpenseController : ControllerBase
    {
        private readonly ExpenseItemService _data;

        public ExpenseController(ExpenseItemService dataFromService)
        {
            _data = dataFromService;
        }
        // AddExpenseItems
        [HttpPost("AddExpenseItems")]

        public bool AddExpenseItems(ExpenseItemModel newExpenseItem)

        {
            return _data.AddExpenseItems(newExpenseItem);
        }

        // GetAllExpenseItems 
        [HttpGet("GetExpenseItems")]

        public IEnumerable<ExpenseItemModel> GetAllExpenseItems()
        {
            return _data.GetAllExpenseItems();
        }

         // GetExpenseItemsByCategory
        [HttpGet("GetExpenseItemByCategory/{Category}")]

        public IEnumerable<ExpenseItemModel> GetItemByCategory(string Category)
        {
            return _data.GetItemByCategory(Category);
        }

        // GetItemsByTags
        [HttpGet("GetItemsByTag/{Tag}")]
        public List<ExpenseItemModel> GetItemsByTag(string Tag)
        {
            return _data.GetItemsByTag(Tag);
        }

        // GetExpenseItemsByDate
        [HttpGet("GetItemsByDate/{Date}")]

        public IEnumerable<ExpenseItemModel> GetExpensesByDate(string Date)
        {
            return _data.GetItemsByDate(Date);
        }

        // UpdateExpenseItems
        [HttpPost("UpdateExpenseItems")]

        public bool UpdateExpenseItems(ExpenseItemModel ExpenseUpdate)
        {
            return _data.UpdateExpenseItems(ExpenseUpdate);
        }


        // DeleteExpenseItems
        [HttpPost("DeleteExpenseItem/{ExpenseDelete}")]

        public bool DeleteExpenseItem(ExpenseItemModel ExpenseDelete)
        {
            return _data.DeleteExpenseItem(ExpenseDelete);
        }

            //WE need a GetItemsByUserId 
    [HttpGet("GetItemsByUserId/{UserId}")]

    public IEnumerable<ExpenseItemModel> GetItemsByUserId (int UserId)
    {
        return _data.GetItemsByUserId(UserId);
    }

    [HttpGet("GetPublishedItems")]
        public IEnumerable<ExpenseItemModel> GetPublishedItems() 
        {
            return _data.GetPublishedItems();
        }
    }


