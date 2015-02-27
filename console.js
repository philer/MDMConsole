/**
 * globals: MDMConsole
 */
(function(doc, undefined) {
  "use strict";
  
  var mdc = window.MDMConsole = {log: log},
      
      getId     = doc.getElementById.bind(doc),
      getClass  = doc.getElementsByClassName.bind(doc),
      getTag    = doc.getElementsByTagName.bind(doc),
      
      inputElem = getId("input"),
      logElem   = getId("log"),
      
      rollback  = [],
      rollbackId = 0;
  
  /// INIT
  
  getTag('form')[0].addEventListener("submit", submit);
  inputElem.addEventListener("keypress", keyNav);
  inputElem.focus();
  
  /**
   * Submit handler for console input form
   * @param  {SubmitEvent} evt
   */
  function submit(evt) {
    evt.preventDefault();
    
    var cmd = inputElem.value;
    inputElem.value = "";
    logInput(cmd);
    
    try {
      mdc.log(eval.call(null, cmd));
    } catch (e) {
      mdc.error(e)
    }
    
    inputElem.focus();
  }
  
  /**
   * Add a log line containing the command to be executed
   * @param  {string} cmd
   */
  function logInput(cmd) {
    rollback.push(cmd);
    rollbackId = rollback.length;
    logElem.innerHTML += '<div class="logline inputline">» ' + cmd + '</div>';
    scrollLog();
  }
  
  /**
   * Log a line
   * @param  {mixed} msg
   */
  mdc.log = function log(msg, error) {
    logElem.innerHTML += '<div class="logline">'
        + mdc.formatString(msg, 3)
        + '</div>';
    scrollLog();
    console.log(msg);
  }
  
  /**
   * Log an error line
   * @param  {Error|string} msg
   */
  mdc.error = function error(msg) {
    logElem.innerHTML += '<div class="logline error">' + msg + '</div>';
    scrollLog();
    
    // console.error(msg instanceof Error ? msg.message : msg);
    throw msg;
  }
  
  /**
   * Automatically scroll to the bottom of the log
   */
  function scrollLog() {
    logElem.scrollTop = logElem.scrollHeight - logElem.offsetHeight;
  }
  
  /**
   * Handle up and down key navigation for cycling through console
   * input history
   * @param  {KeypressEvent} evt
   */
  function keyNav(evt) {
    if (evt.keyCode === 38) {
      evt.preventDefault();
      rollUp();
    } else if (evt.keyCode === 40) {
      evt.preventDefault();
      rollDown();
    }
  }
  
  /**
   * Cycle up through the console input history
   */
  function rollUp() {
    if (rollbackId > 0) {
      inputElem.value = rollback[--rollbackId];
    }
  }
  
  /**
   * Cycle down through the console input history
   */
  function rollDown() {
    if (rollbackId < rollback.length - 1) {
      inputElem.value = rollback[++rollbackId];
    } else if (rollbackId === rollback.length - 1) {
      rollbackId++;
      inputElem.value = "";
    }
  }
  
  /**
   * Render a user friendly string representation of
   * Arrays and Objects.
   * 
   * @param  {mixed}   x
   * @param  {integer} depth nesting depth to be displayed
   * @return {string}
   */
  mdc.formatString = function formatString(x, depth) {
    depth = +depth;
    
    switch (x) {
      case undefined:
        return "undefined";
        
      case null:
        return "null";
    }
    
    if (Array.isArray(x)) {
      return "["
        + x.map(
            function(elem) {
              return depth ? formatString(elem, depth-1) : elem;
            })
          .join(", ")
        + "]";
    }
    
    switch (typeof x) {
      case "function":
        return "function";
        
      case "object":
        return "{"
          + Object.getOwnPropertyNames(x)
              .map(
                function(prop) {
                  return prop + ": " + (depth ? formatString(x[prop], depth-1) : x[prop]);
                }) 
              .join(", ")
          + "}";
      
      default:
        return "" + x;
    }
  };
  
})(document);