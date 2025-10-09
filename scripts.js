const ROWS = 10
const COLUMNS = 5
const FIRST_CHAR_CODE = 65

const range = n => Array.from({ length: n }, (_, i) => i)
const getColumn = i => String.fromCharCode(FIRST_CHAR_CODE + i)

let STATE = range(COLUMNS).map(col =>
    range(ROWS).map(row => ({
        value: "",
        computedValue: `${getColumn(col)}${row + 1}`
    }))
)

const $thead = document.querySelector("thead")
const $tbody = document.querySelector("tbody")

const render = () => {
    $thead.innerHTML = `
        <tr>
          <th></th>
          ${range(COLUMNS).map(i => `<th>${getColumn(i)}</th>`).join("")}
        </tr>
      `
    $tbody.innerHTML = range(ROWS).map(row => `
        <tr>
          <td>${row + 1}</td>
          ${range(COLUMNS).map(col => `
            <td data-x="${col}" data-y="${row}">
              <span>${STATE[col][row].value || ""}</span>
              <input type="text" value="${STATE[col][row].value}">
            </td>
          `).join("")}
        </tr>
      `).join("")
}

$tbody.addEventListener("click", e => {
    const td = e.target.closest("td[data-x]")
    if (!td) return
    const { x, y } = td.dataset
    const input = td.querySelector("input")
    const span = td.querySelector("span")

    span.style.display = "none"
    input.style.display = "flex"
    input.focus()
    input.setSelectionRange(input.value.length, input.value.length)

    input.addEventListener("blur", e => {
        STATE[x][y].value = e.target.value
        span.textContent = e.target.value
        span.style.display = "flex"
        input.style.display = "none"
    }, { once: true })
})

render()