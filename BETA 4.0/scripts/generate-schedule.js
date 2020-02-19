function generateSchedule() {
  return schedule.reduce((content, day) => {
    return content + `
      <div class="mdl-card mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--6-col-phone mdl-color--black mdl-shadow--3dp">
        <table class="mdl-card-text-table mdl-color--black mdl-typography--text-center">
          <thead>
            <tr class="mdl-color--grey-900 mdl-typography--text-uppercase mdl-typography--title">
              <td colspan="2">${day.date}</td>
            </tr>
          </thead>
          ${generateDaySchedule(day)}
        </table>
      </div>
      `
  }, '')
}

function generateDaySchedule(day) {
  return day.timeline.reduce((content, lecture) => {
    return content + generateLectureContent(lecture)
  }, '')
}

function generateLectureContent(lecture) {
  const secondRow = lecture.end ? `
    <tr>
      <td>${lecture.end}</td>
    </tr>
  ` : ''
  const firstRow = lecture.start ? `
    <tr>
      <td>${lecture.start}</td>
      <td rowspan="${secondRow ? 2 : 1}">
        <span>${lecture.title}</span>
        </br>
        <span>${lecture.speaker}</span>
      </td>
    </tr>
  ` : `
    <tr><td colspan="2">${lecture.title}</td></tr>
  `
  return `
    <tbody class="js-row-link">
      ${firstRow}
      ${secondRow}
    </tbody>
  `
}
