const WidgetCommonIDR = ({value}) => {
  return <>{value ? value.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) : 0}</>
}

export default WidgetCommonIDR;