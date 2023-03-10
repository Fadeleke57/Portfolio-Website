var form = document.getElementsByTagName("form")[0];
form.addEventListener("submit", function(e) {
  e.preventDefault();
  sendData();
});

// https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Sending_forms_through_JavaScript
function sendData() {
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];

  urlEncodedDataPairs.push(
    encodeURIComponent("name") +
      "=" +
      encodeURIComponent(form.querySelector("[name='name']").value)
  );
  urlEncodedDataPairs.push(
    encodeURIComponent("send_to") +
      "=" +
      encodeURIComponent(form.querySelector("[name='send_to']").value)
  );
  urlEncodedDataPairs.push(
    encodeURIComponent("email") +
      "=" +
      encodeURIComponent(form.querySelector("[name='email']").value)
  );
  urlEncodedDataPairs.push(
    encodeURIComponent("message") +
      "=" +
      encodeURIComponent(form.querySelector("[name='message']").value)
 
  );
  urlEncodedDataPairs.push(
    encodeURIComponent("date-time") +
      "=" +
      encodeURIComponent(form.querySelector("[name='date-time']").value)

  );

  // Combine the pairs into a single string and replace all %-encoded spaces to
  // the '+' character; matches the behaviour of browser form submissions.
  urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

  // Define what happens on successful data submission
  XHR.addEventListener("load", function(event) {
    if (XHR.readyState === XHR.DONE) {
      if (XHR.status === 200) {
        alert("Thank You! Your Message Has been Sent.");
      } else {
        alert("Oh oh! We have a problem! " + XHR.responseText + ".");
      }
    }
  });

  // Define what happens in case of error
  XHR.addEventListener("error", function(event) {
    // This is normally a timeout or connection error.
    alert("Oops! Something went wrong.");
  });

  // Set up our request
  XHR.open(form.getAttribute("method"), form.getAttribute("action"));

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Finally, send our data.
  XHR.send(urlEncodedData);
}
