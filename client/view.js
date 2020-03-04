

function showTableTodos(data) {
  // let table = $('#tableTodos')
  // table.empty()
  $('#tableTodos').empty()
  data.forEach(el => {
    $('#tableTodos').append(`<tr>
    <td class='title'>${el.title}</td>
    <td class='description'>${el.description}</td>
    <td class='status'>${el.status}</td>
    <td class='due_date'>${el.due_date.split('T')[0]}</td>
    <td>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-secondary" id="editTodos" onclick="editTodos(${el.id})">Edit</button>
        <button type="button" class="btn btn-secondary" id="deleteTodos" onclick=deletTodos(${el.id})>Delete</button>
      </div>
    </td>
  </tr>`)
  })
}
