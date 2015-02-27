/**
 * Does nothing but define MDM's expected global functions
 * so they will add a log entry
 * 
 * globals:
 *   mdm_enable
 *   mdm_disable
 *   mdm_prompt
 *   mdm_noecho
 *   mdm_add_user
 *   mdm_add_session
 *   mdm_add_language
 *   mdm_set_current_user
 *   mdm_set_current_session
 *   mdm_set_current_language
 *   mdm_error
 *   mdm_msg
 *   mdm_timed
 *   set_welcome_message
 *   set_clock
 *   mdm_hide_shutdown
 *   mdm_hide_restart
 *   mdm_hide_suspend
 *   mdm_hide_quit
 *   mdm_hide_xdmcp
 */
(function(win, mdc) {
  // Called by MDM to disable user input
  win.mdm_enable = function() {
    mdc.log("MDM called 'mdm_enable()'");
  };
  // Called by MDM to enable user input
  win.mdm_disable = function() {
    mdc.log("MDM called 'mdm_disable()'");
  };
  
  // Called by MDM to allow the user to input a username
  win.mdm_prompt = function(message) {
    mdc.log("MDM called 'mdm_prompt("
      + message
      + ")'");
  };
  // Called by MDM to allow the user to input a password
  win.mdm_noecho = function(message) {
    mdc.log("MDM called 'mdm_noecho("
      + message
      + ")'");
  };
  
  // Called by MDM to add a user to the list of users
  win.mdm_add_user = function(username, gecos, status) {
    mdc.log("MDM called 'mdm_add_user("
      + username + ", " + gecos + ", " + status
      + ")'");
  };
  // Called by MDM to add a session to the list of sessions
  win.mdm_add_session = function(session_name, session_file) {
    mdc.log("MDM called 'mdm_add_session("
      + session_name + ", " + session_file
      + ")'");
  };
  // Called by MDM to add a language to the list of languages
  win.mdm_add_language = function(language_name, language_code) {
    mdc.log("MDM called 'mdm_add_language("
      + language_name + ", " + language_code
      + ")'");
  };
  
  win.mdm_set_current_user = function(username) {
    mdc.log("MDM called 'mdm_set_current_user("
      + username
      + ")'");
  };
  win.mdm_set_current_session = function(session_name, session_file) {
    mdc.log("MDM called 'mdm_set_current_session("
      + session_name + ", " + session_file
      + ")'");
  };
  win.mdm_set_current_language = function(language_name, language_code) {
    mdc.log("MDM called 'mdm_set_current_language("
      + language_name + ", " + language_code
      + ")'");
  };
  
  // Called by MDM to show an error
  win.mdm_error = function(message) {
    mdc.log("MDM called 'mdm_error("
      + message
      + ")'");
  };
  // Called by MDM to show a message (usually "Please enter your username")
  win.mdm_msg = function(message) {
    mdc.log("MDM called 'mdm_msg("
      + message
      + ")'");
  };
  // Called by MDM to show a timed login countdown
  win.mdm_timed = function(message) {
    mdc.log("MDM called 'mdm_timed("
      + message
      + ")'");
    
  };
  
  // Called by MDM to set the welcome message
  win.set_welcome_message = function(message) {
    mdc.log("MDM called 'set_welcome_message("
      + message
      + ")'");
  };
  
  // Called by MDM to update the clock
  win.set_clock = function(message) {
    mdc.log("MDM called 'set_clock("
      + message
      + ")'");
  };
  
  // Called by MDM if the SHUTDOWN command shouldn't appear in the greeter
  win.mdm_hide_shutdown = function() {
    mdc.log("MDM called 'mdm_hide_shutdown()'");
  };
  // Called by MDM if the RESTART command shouldn't appear in the greeter
  win.mdm_hide_restart = function() {
    mdc.log("MDM called 'mdm_hide_restart()'");
  };
  // Called by MDM if the SUSPEND command shouldn't appear in the greeter
  win.mdm_hide_suspend = function() {
    mdc.log("MDM called 'mdm_hide_suspend()'");
  };
  // Called by MDM if the QUIT command shouldn't appear in the greeter
  win.mdm_hide_quit = function() {
    mdc.log("MDM called 'mdm_hide_quit()'");
  };
  
  // Called by MDM if the XDMCP command shouldn't appear in the greeter
  // apparently not implemented by MDM (mdmwebkit.c @ 2014-07-30)
  win.mdm_hide_xdmcp = function() {
    mdc.log("MDM called 'mdm_hide_xdmcp()'");
  };
  
})(window, MDMConsole);