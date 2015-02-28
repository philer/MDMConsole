(function(doc, cnsl) {
  
  "use strict";
  
  var alerts = [
        "USER###{username}",
        "LOGIN###{username_or_password}",
        "LANGUAGE###{language_code}",
        "SESSION###{session_name}###{session_file}",
        "SHUTDOWN###",
        "RESTART###",
        "SUSPEND###",
        "FORCE-SHUTDOWN###",
        "FORCE-RESTART###",
        "FORCE-SUSPEND###",
        "QUIT###",
      ];
  
  var re = /\{(\w+)\}/g,
      html = "",
      btns, forms;
  
  // create forms html
  for (var i = 0, len = alerts.length ; i < len ; ++i) {
    
    if (re.test(alerts[i])) {
      html += '<form class="mdm-alert-form" data-alert="' + alerts[i] + '">'
        + alerts[i].replace(re, '<input type="text" id="mdm-alert-input-$1" placeholder="$1" />')
        + '<button>»</button>'
        + '</form>';
    }
    else {
      html += '<button class="mdm-alert-button">' + alerts[i] + '</button>';
    }
    
  }
  doc.getElementById("mdm-alerts").innerHTML += html;
  
  btns  = doc.getElementsByClassName("mdm-alert-button");
  forms = doc.getElementsByClassName("mdm-alert-form");
  
  // apply button listeners
  for (var i = btns.length ; i-- ; ) (function(btn) {
    btn.addEventListener("click", function(evt) {
      evt.preventDefault();
      
      if (cnsl) {
        cnsl.exec('alert("' + btn.innerHTML + '")');
      } else {
        alert(btn.innerHTML);
      }
      
      
    });
  })(btns[i]);
  
  // apply form listeners
  for (var i = forms.length ; i-- ; ) (function(form) {
    form.addEventListener("submit", function(evt) {
      evt.preventDefault();
      
      var txt = form.dataset.alert.replace(re, function(_, p1) {
        return doc.getElementById("mdm-alert-input-" + p1).value;
      });
      
      if (cnsl) {
        cnsl.exec('alert("' + txt + '")');
      } else {
        alert(txt);
      }
      
    });
  })(forms[i]);
  
})(document, HtmlConsole);