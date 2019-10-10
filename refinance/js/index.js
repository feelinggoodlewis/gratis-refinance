$(document).ready(() => {

   var origin = location.pathname
   var slideIndex = 1;
   const showSlides = (n) => {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      // var dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
      }
      slides[slideIndex - 1].style.display = "block";
   }

   showSlides(slideIndex);

   // Next/previous controls
   const plusSlides = (n) => {
      showSlides(slideIndex += n);
   }
   // delay timer
   const delay = () => {
      return new Promise((resolve, reject) => {
         var time = setTimeout(() => {
            resolve('done')
         }, 500)
      }).catch(error => {
         reject(error)
      })
   }
   // navigation through questions
   $('.move_next').on('click', async (e) => {
      // get the page ID
      var page = $('.move_next').filter(e.target).attr('id')
      // switch the pages and run it's method
      switch (page) {
         case 'qt5':
            await delay()
            plusSlides(1)
            runSlider(undefined, "5")
            break;
         case 'qt6':
            await delay()
            plusSlides(1)
            runSlider(undefined, "6")
            break;
         case 'qt7':
            await delay()
            plusSlides(1)
            runSlider(7, "7")
            break;
         case 'qt9':
            var addr = $('#address').val();
            var zCode = $('#zip').val();
            if (addr.trim() === '') {
               return $('.error8').text('Address is required')
            }
            if (zCode.trim() === '') {
               return $('.error8').text('Zip code is required')
            }
            if (isNaN(zCode)) {
               return $('.error8').text('Zip code should be numeric')
            }
            if (zCode.length !== 5) {
               return $('.error8').text('Invalid zip code')
            }
            await delay()
            $('.error8').text('')
            plusSlides(1)
            break;
         default:
            await delay()
            plusSlides(1)
      }
      history.pushState({ page: slideIndex }, '', `${origin}#${slideIndex}`)
   })
   // when the form is to be submitted
   $('#submit_form').on('click', (e) => {
      e.preventDefault()
      var firstName = $('#first_name').val();
      var lastName = $('#last_name').val();
      var email = $('#email').val();
      var phone = $('#phone').val();
      var altPhone = $('#alt_phone').val();

      if (firstName === '') {
         return displayError('First Name is required')
      }
      if (lastName === '') {
         return displayError('Last Name is required')
      }
      if (email === '') {
         return displayError('Email is required')
      }
      if (!email.includes('@')) {
         return displayError('Invalid Email')
      }
      if (!email.includes('.')) {
         return displayError('Invalid Email')
      }
      if (phone === '') {
         return displayError('Phone Number required')
      }
      if (isNaN(phone)) {
         return displayError('Invalid phone number')
      }
      if (phone.length > 10) {
         return displayError('Invalid phone number')
      }
      if (altPhone && isNaN(altPhone)) {
         return displayError('Invalid alternative phone number')
      }
      if (altPhone && altPhone.length > 10) {
         return displayError('Invalid alternative phone number')
      }
      displayError('')

      var formReq = $('#request_form').serialize()
      console.log(formReq)

   })

   // function to display the sliding value on sliding pages
   const runSlider = (type, id) => {
      var slider = document.getElementById(`myRange${id}`);
      var output = document.querySelector(`.out_put${id}`);
      if (type) {
         output.textContent = '3% or less'
         slider.oninput = function () {
            var val = `${((this.value / 9.918).toString()).substr(0, 5)}%`
            output.textContent = val.includes('3.0') ? '3% or less' : val.includes('6.0') ? '6.0% or over' : val;
         }
      } else {
         runSwitchValue(slider.value, output)
         slider.oninput = function () {
            runSwitchValue(this.value, output)
         }
      }
   }
   // function to switch values and add dollar signs
   const runSwitchValue = (value, output) => {
      var value1 = null
      switch (value.length) {
         case 5:
            value1 = value.substr(0, 2) + "," + value.substr(2)
            break;
         case 6:
            value1 = value.substr(0, 3) + "," + value.substr(3)
            break;
         case 7:
            value1 = value.substr(0, 1) + "," + value.substr(1, 3) + "," + value.substr(4)
            break;
         default:
            value1 = value
      }
      output.textContent = value1 === '50,000' ? `$50,000 or less` : value1 === '750,000' ? '$750,000 or more' : `$${value1}`
   }

   // event handler for navigation button
   window.onpopstate = (e) => {
      var page = location.hash
      if (page !== '') {
         return showSlides(slideIndex = parseInt(page.substr(1)));
      }
      showSlides(slideIndex = 1)
   }

   // function to display error
   const displayError = (message) => {
      $('.error').text(message)
      $('.error').addClass('p-2')
      $('html,body').animate({ scrollTop: $('.error').offset().top - 100 })
   }

   // display the current year on the footer
   $('.copyright span').text(new Date().getFullYear());
   // display privacy note when the privay is click
   $('body').on('click', '.privacy_policy', (e) => {
      e.preventDefault()
      $('#modal').removeClass('d-none')
      $('#license_text').addClass('d-none')
      $('#privacy_text').removeClass('d-none')
   })
   // display license note when is click
   $('body').on('click', '.license', () => {
      $('#modal').removeClass('d-none')
      $('#privacy_text').addClass('d-none')
      $('#license_text').removeClass('d-none')
   })
   // close the modal when the modal is clicked
   $('#modal').on('click', () => {
      $('#modal').addClass('d-none')
   })
})