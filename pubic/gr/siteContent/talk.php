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
           <p>Για να επικοινωνήσετε μαζί μας
           <br />
           μπορείτε να στείλετε email στη διεύθυνση:</p>
<a href="mailto:&#105;&#110;&#102;&#111;&#64;&#112;&#97;&#114;&#97;&#109;&#97;&#110;&#97;&#46;&#99;&#111;&#109;">&#105;&#110;&#102;&#111;&#64;&#112;&#97;&#114;&#97;&#109;&#97;&#110;&#97;&#46;&#99;&#111;&#109;</a> 
           <p>Ή αν θέλετε μπορείτε επισης να χρησιμοποιήσετε τη φόρμα στα δεξιά.</p>
        </div>
    </div>
    <div class="rightColumn">
        <form id="forma" method="post" action="">
            <div id="formaNames"><p>
                <label for="name" id="messageText">κάποιο όνομα..</label>
                <input type="text" name="name" class="inp" id="name" value="" />
                <label for="email" id="messageText">ένα e-mail..</label>
                <input type="text" name="email"  class="inp" id="email" value="" /></p>
            </div>
            <div id="formaMessage">
                <label for="message" id="messageText">μήνυμα:</label>
                <textarea name="message" class="inp" cols="40" rows="7" id="message"></textarea>

                <input type="submit" name="submit" class="button" value="αποστολή" id="send"/>
            </div>
        </form>
    </div>
    <div class="error" id="nameError">
        Ένα όνομα..
    </div>
    <div class="error" id="emailError">
        Ένα email..
    </div>
    <div class="error" id="emailWrong">
        Το email είναι λάθος.
    </div>
    <div class="error" id="messageError">
        <div>Το μήνυμά σου </div>
        <div>είναι κενό.</div>
    </div>
</div>