document.getElementById('searchBtn').addEventListener('click', function () {
  const input1 = document.getElementById('input1').value;
  const input2 = document.getElementById('input2').value;
  const input3 = document.getElementById('input3').value;

  alert(`Search Triggered with:\nInput 1: ${input1}\nInput 2: ${input2}\nInput 3: ${input3}`);
  console.log({ input1, input2, input3 });
});
