<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(record, i) in records" :key="record.id">
        <td>{{ i + 1 }}</td>
        <td>{{ +record.amount | currency() }}</td>
        <td>{{ new Date(record.date) | date('date-time') }}</td>
        <td>{{ record.categoryName }}</td>
        <td>
          <span class="white-text badge" :class="[record.typeColor]">{{ record.typeText }}</span>
        </td>
        <td>
          <router-link class="btn-small btn" tag="button" :to="`detail-record/${record.id}`">
            <i class="material-icons">open_in_new</i>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'history-table',
  props: {
    records: {
      type: Array,
      required: true,
    },
  },
}
</script>
