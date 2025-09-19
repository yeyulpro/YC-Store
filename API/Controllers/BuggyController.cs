using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound("Content is not found.");
        }
        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("This is not a good request.");
        }
        [HttpGet("unauthorized")]
        public IActionResult GetUnauthorized()
        {
            return Unauthorized("You are not authorized.");
        }
        [HttpGet("validation-error")]
        public IActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "This is the first error");
            ModelState.AddModelError("Problem2", "This is the second error");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public IActionResult GerServerError()
        {
            throw new Exception("This is a server error.");
        }
    }
}