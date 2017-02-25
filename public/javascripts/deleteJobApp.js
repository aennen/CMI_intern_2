function deleteJob(jobId) {
    console.log("Delete button clicked!");
    var form = document.createElement("form");
    form.method = 'post';
    form.action = '/deleteApp';
    var input = document.createElement('input');
    input.type = "text";
    input.name = "idProject_fk";
    input.value = jobId;
    form.appendChild(input);
    form.submit();
}

/**
 * Created by afric on 12/5/2016.
 */
