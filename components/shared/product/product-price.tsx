'use client'

import { cn, formatCurrency } from '@/lib/utils'

const ProductPrice = ({
  price,
  className,
  listPrice = 0, //Ürünün liste fiyatı indirim öncesi fiyat
  isDeal = false, //özel teklif
  forListing = true, //ürünün listeleme görünümü için olduğunu belirtir.
  plain = false, //Sadece düz metin formatında fiyat döndürmek için kullanılır.
}: {
  price: number
  isDeal?: boolean
  listPrice?: number
  className?: string
  forListing?: boolean
  plain?: boolean
}) => {

  // İndirim Oranı Hesaplama
  const discountPercent = Math.round(
    100 - (price / listPrice) * 100
  )
  //Fiyatın Tam ve Ondalık Kısımlarını Bölme
  const stringValue = price.toString()
  const [intValue, floatValue] = stringValue.includes('.')
    ? stringValue.split('.') //noktadan bölerek tam ve ondalık kısmını alır eğer fiyat tamsayıysa ondalık kısmı boş string olarak dönder
    : [stringValue, '']

  return plain ? (
    formatCurrency(price)
  ):listPrice==0 ? (
    <div className={cn('text-3xl', className)}>
      <span className='text-xs align-super'>$</span>
      {intValue}
      <span className='text-xs align-super'>{floatValue}</span>
    </div>
  ) : isDeal ? (
    <div className='space-y-2'>
      <div className='flex justify-center items-center gap-2'>
        <span className='bg-red-700 rounded-sm p-1 text-white text-sm font-semibold'>
          {discountPercent} % Off
        </span>
        <span className='text-red-700 text-xs font-bold'>
          Limited time deal
        </span>
      </div>
      <div
        className={`flex ${forListing && 'justify-center'} items-center gap-2`}
      >
        <div className={cn('text-3xl', className)}>
          <span className='text-xs align-super'>$</span>
          {intValue}
          <span className='text-xs align-super'>{floatValue}</span>
        </div>
        <div className='text-muted-foreground text-xs py-2'>
         Was:<span className='line-through'>
           {formatCurrency(listPrice)}
          </span>
        </div>
      </div>
    </div>
  ) : (
    <div className=''>
      <div className='flex justify-center gap-3'>
        <div className='text-3xl text-orange-700'>-{discountPercent}%</div>
        <div className={cn('text-3xl', className)}>
          <span className='text-xs align-super'>$</span>
          {intValue}
          <span className='text-xs align-super'>{floatValue}</span>
        </div>
      </div>
      <div className='text-muted-foreground text-xs py-2'>
        List price:{" "}
       <span className='line-through'>{formatCurrency(listPrice)} </span>
     
      </div>
    </div>
  )
}

export default ProductPrice