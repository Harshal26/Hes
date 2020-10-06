<?php
$servername="localhost";
$username="root";
$password="harshal";
$conn=mysqli_connect($localhost, $root,$harshal); // Establishing Connection with Server
mysql_select_db("HES", $connection); // Selecting Database from Server*
if(isset($_POST['submit'])){ // Fetching variables of the form which travels in URL
$Name = $_POST['name'];
$Email = $_POST['email'];
$c_number = $_POST['contact'];
$enq = $_POST['enquiry'];
$mess = $_POST['message'];
if($name !=''||$email !='')
{
//Insert Query of SQL
$query = mysql_query("insert into app(Name,Email,c_number,enq,mess) values ('$Name', '$Email', '$c_number', '$enq' , '$mess')");
echo "<br/><br/><span>Data Inserted successfully...!!</span>";
}
else{
echo "<p>Insertion Failed <br/> Some Fields are Blank....!!</p>";
}
}
mysql_close($connection); // Closing Connection with Server
?>

