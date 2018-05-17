<?php
    $severname = 'localhost';
    $username = 'root';
    $password = 'root';
    $dbname = 'mycommonweb';
    $conn = new mysqli($severname,$username,$password,$dbname);
    if($conn->connect_error){
        die('连接失败：' . $conn->connect_error);
    }
    $conn->set_charset('utf8');
    $class = isset($_GET['class'])?$_GET['class'] : '';
    $subclass = isset($_GET['subclass'])?$_GET['subclass'] : '';
    $name = isset($_GET['name'])?$_GET['name'] : '';
    $url = isset($_GET['url'])?$_GET['url'] : '';
    $id = isset($_GET['id'])?$_GET['id'] : '';
    if($id != ''){
        $sql = "delete from web where id='$id'";
        if ($conn->query($sql) === TRUE) {
                echo "ok";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        $conn->close();
    } 
    if($name != ''){
        $sql = "insert into web (url, name, class, subclass) values ('$url', '$name', '$class', '$subclass')";
        if ($conn->query($sql) === TRUE) {
                echo "ok";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        $conn->close();
    }

    if($subclass != '' && $name == ''){
        $sql = "select * from web where class='$class' and subclass='$subclass'";
        $result = $conn->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
        $conn->close();
    }
    
    if($class != '' && $subclass == ''){
        $sql = "select * from web where class='$class'";
        $result = $conn->query($sql);
        $row = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        echo json_encode($row,JSON_UNESCAPED_UNICODE);
        $conn->close();
    }
?>