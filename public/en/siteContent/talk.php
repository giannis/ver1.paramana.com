<div id="talkWindow" class="mainWindow">
    <div class="talkTitle">
        <!--[if !IE]>-->
            <img src="images/contactTitle.png" width="482" height="20" alt="" />
        <!--<![endif]-->
        <!--[if gt IE 6]>
             <img src="images/contactTitle.png" width="482" height="20" alt="" />
        <![endif]-->
        <!--[if lte  IE 6]>
             <img src="images/IE6/contactTitle.png" width="482" height="20" alt="" />
        <![endif]-->
    </div>
    <div class="leftColumn">
        <div id="talkText">
           <p>In order to contact us you can send
           <br />
           us an email at the address:</p>
<a href="mailto:&#105;&#110;&#102;&#111;&#64;&#112;&#97;&#114;&#97;&#109;&#97;&#110;&#97;&#46;&#99;&#111;&#109;">&#105;&#110;&#102;&#111;&#64;&#112;&#97;&#114;&#97;&#109;&#97;&#110;&#97;&#46;&#99;&#111;&#109;</a> 
           <p>Or if you wish, you can also use the special form here on the right.</p>
        </div>
    </div>
    <div class="rightColumn">
        <form id="forma" method="post" action="">
            <div id="formaNames"><p>
                <label for="name" id="messageText">your name..</label>
                <input type="text" name="name" class="inp" id="name" value="" />
                <label for="email" id="messageText">your e-mail..</label>
                <input type="text" name="email"  class="inp" id="email" value="" /></p>
            </div>
            <div id="formaMessage">
                <label for="message" id="messageText">message:</label>
                <textarea name="message" class="inp" cols="40" rows="7" id="message"></textarea>

                <input type="submit" name="submit" class="button" value="submit" id="send"/>
            </div>
        </form>
    </div>
    <div class="error" id="nameError">
        You need to write a name.
    </div>
    <div class="error" id="emailError">
        An email is required.
    </div>
    <div class="error" id="emailWrong">
        You need a valid email.
    </div>
    <div class="error" id="messageError">
        Your message is empty.
    </div>
</div>     