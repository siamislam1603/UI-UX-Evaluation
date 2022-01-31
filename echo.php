<?php
    if(isset($_POST['form_data'])){
        $data=json_decode($_POST['form_data'], true );
        echo "<h3 class='text-center'><span class='purple-hr'>Form Submission Info</span></h3>
                <div class='row my-5'>
                    <div class='col-sm-5'>
                        <div class='card-custom'>
                            <div class='text-center'>
                                <i class='fas fa-user'></i>
                                <br>
                                <legend>{$data['name']}</legend>
                            </div>
                            <div class='fw-bold mb-3'><span class='purple-hr text-capitalize'>Personal Information</span></div>
                            <div class='row'>
                                <i class='fas fa-envelope mb-3'><small class='icon-txt-margin fs-6'>{$data['email']}</small></i>
                                <i class='fas fa-phone mb-3'><small class='icon-txt-margin fs-6'>{$data['phone']}</small></i>
                                <i class='fas fa-restroom mb-3'><small class='icon-txt-margin fs-6'>{$data['gender']}</small></i>
                                <i class='fas fa-flag-alt mb-3'><small class='icon-txt-margin fs-6 text-capitalize'>{$data['country']}</small></i>
                            </div>
                        </div>
                    </div>
                    <div class='col-sm-7'>
                        <div class='card-custom'>
                            <div class='fw-bold mb-3'><span class='purple-hr'>Educational Information</span></div>
                            <table class='table'>
                            <thead>
                            <tr>
                                <th scope='col' class='col-9'>Degree Name</th>
                                <th scope='col' class='col-3'>Passing Year</th>
                            </tr>
                            </thead>
                            <tbody>";
        for ($i = 0; $i < count($data['degree']); $i++) {
            echo "<tr>
                        <td>{$data['degree'][$i]}</td>
                        <td>{$data['year'][$i]}</td>
                    </tr>";
        }
        echo "</tbody>
                </table>
                </div>
                </div>
                </div>";
    }
    
?>
    