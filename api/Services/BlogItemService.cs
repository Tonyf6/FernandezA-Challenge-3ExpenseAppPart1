using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using api.Services.Context;

namespace api.Services;

public class BlogItemService : ControllerBase
{
    private readonly DataContext _context;

    public BlogItemService(DataContext context)
    {
            _context = context;
    }
    public bool AddBlogItems(ExpenseModel newBlogItem)
    {
        bool result = false;
        _context.Add(newBlogItem);
        result = _context.SaveChanges() != 0;
        return result;
    }

    public bool DeleteBlogItem(ExpenseModel blogDelete)
    {
        throw new NotImplementedException();
    }

     public IEnumerable<ExpenseModel> GetAllBlogItems()
    {
        return _context.BlogInfo;
    }

    public IEnumerable<ExpenseModel> GetItemByCategory(string category)
    {
        return _context.BlogInfo.Where(item => item.Category == category);
    }

    public IEnumerable<ExpenseModel> GetItemsByDate(string date)
    {
        throw new NotImplementedException();
    }

    public List<ExpenseModel> GetItemsByTag(string Tag)
    {
        List<ExpenseModel> AllBlogsWithTag = new List<ExpenseModel>();
        var allItems = GetAllBlogItems().ToList();
        for(int i = 0; i < allItems.Count; i++)
        {
            // ExpenseModel Item = allItems[i];
            // var itemArr = Item.Tag.Split(',');
            // for(int j = 0; j < itemArr.Length; j++)
            // {
            //     if(itemArr[j].Contains(Tag))
            //     {
            //         AllBlogsWithTag.Add(Item);
            //         break;
            //     }
            // }
        }
        return AllBlogsWithTag;

    }

    public bool UpdateBlogItems(ExpenseModel blogUpdate)
    {
       _context.Update<ExpenseModel>(blogUpdate);
       return _context.SaveChanges() !=0;
    }

    public IEnumerable<ExpenseModel> GetItemsByUserId(int userId)
    {
        return _context.BlogInfo.Where(item => item.UserId == userId && item.IsDeleted == false);
    }
    public IEnumerable<ExpenseModel> GetPublishedItems() {
        return _context.BlogInfo.Where(item => item.IsPublished && item.IsDeleted == false);
    }
}
