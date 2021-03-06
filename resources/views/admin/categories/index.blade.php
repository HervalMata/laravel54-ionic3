@extends('layouts.admin')

@section('content')
    <div class="container">
        <div class="row">
            <h3>Listagem de Categorias</h3>
            {!! Button::primary('Nova Categoria')->asLinkTo(route('admin.categories.create')) !!}
        </div>
        <div class="row">
            {!!
                Table::withContents($categories->items())->striped()->callback('Ações', function($field, $category){
                    $linkEdit = route('admin.categories.edit', [ 'category' => $category->id]);
                    $linkShow = route('admin.categories.show', [ 'category' => $category->id]);
                    return Button::link(Icon::create('pencil'))->asLinkTo($linkEdit).'|'.
                           Button::link(Icon::create('remove'))->asLinkTo($linkShow);
                })
            !!}
        </div>

        {!! $categories->links() !!}
    </div>
@endsection