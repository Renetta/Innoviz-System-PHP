<?php
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    
    $postdata = file_get_contents("php://input", true);
    // $req = json_decode($postdata, true);
    // if there is a post data
    $req=$_POST["info"];
    $req=json_decode($req);
    // var_dump($req->email);
    if(isset($_POST) && !empty($_POST)) {
        $eol = "\r\n";
        // if there is an attachment
        if (!empty($_FILES['file']['name'])) {
            //store some variables
            $file_name = $_FILES['file']['name'];
            $temp_name = $_FILES['file']['tmp_name'];
            $file_type = $_FILES['file']['type'];

            //get extension
            $base = basename($file_name);
            $extension = substr($base, strlen($base)-4, strlen($base));

            //allow only these file types
            $allowed_extensions = array(".doc", ".docx", ".pdf", ".PDF");

            if(in_array($extension, $allowed_extensions)) {
                //mail essentials
                $from = $req->email;
                $fname = $req->fname;
                $lname = $req->lname;
                $contact = $req->phone;
                $position = $req->position;
                $subject = $req->subject;

                $to = "renetta92@gmail.com";

                $file = $temp_name;
                // $content = file_get_contents($file_name);
                // $content = chunk_split(base64_encode(file_get_contents($file)));

                $content = file_get_contents($temp_name);
                $content = chunk_split(base64_encode($content));

                $uid = md5(uniqid(time()));
                //standard mail headers
                $headers = "From: ".$from. $eol;
                $headers .= "MIME-Version: 1.0" . $eol;
                $headers .= "Content-Type: multipart/mixed; boundary=\"" . $uid . "\"" . $eol;
                $headers .= "Content-Transfer-Encoding: 7bit" . $eol;
                $headers .= "This is a MIME encoded message." . $eol;

                // plain text part
                $body = "--" . $uid . $eol;
                $body .= "Content-Type: text/plain; charset=\"iso-8859-1\"" . $eol;
                $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
                $body .= "Name:- ".$fname." ".$lname."\r\n\n";
                $body .= "Contact Number:- ".$contact."\r\n\n";
                $body .= "Email:- ".$from."\r\n\n";
                $body .= "Position: ".$position."\r\n\n";

                //file attachment
                $body .= "--" . $uid . $eol;
                $body .= "Content-Type: application/octet-stream; name=\"" . $file_name . "\"" . $eol;
                $body .= "Content-Transfer-Encoding: base64" . $eol;
                $body .= "Content-Disposition: attachment filename=\"" .$file_name. $eol;
                $body .= $content . $eol;
                $body .= "--" . $uid . "--";

                //send the mail

                if (mail($to, $subject, $body, $headers)) {
                    echo "Thank you for reaching out to Innoviz Systems.";
                    $replybody = "";
                    $replybody .= "Dear ".$fname." ".$lname.",\r\n\n";
                    $replybody .= "Greetings! \r\n\n";
                    $replybody .= "Thank you for reaching out to Innoviz Systems.. \r\n\n"; 
                    $replybody .= "This is a confirmation that we have received your resume for ".$position.".\r\n\n"; 
                    $replybody .= "We will review your resume shortly and will be in touch no time.\r\n\n"; 
                    $replybody .= "Regards, \r\n\n";
                    $replybody .= "Innoviz Systems\r\n\n"; 

                    $replyfrom ="Innoviz Systems";
                    $replymail = 'noreply@innovizqatar.com';

                    $headers = "From: ".$replyfrom." <".$replymail.">" . $eol;
                    $headers .= "(This is an auto-generated mail. Please do not reply)." . $eol;
                    mail($from, $subject, $replybody, $headers);

                } else {
                    echo "Something went wrong";
                }

            } else {
                echo "file type not allowed";
            }

        } else {
            echo "Upload your resume.";
        }    
    }
?>